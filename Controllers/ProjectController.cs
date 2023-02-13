using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjectManagementApplication.Data;
using ProjectManagementApplication.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using System.IO;

namespace ProjectManagementApplication.Controllers
{
    [Authorize]
    public class ProjectController : Controller
    {
        private readonly ApplicationDbContext _context;

        private Dictionary<IdentityUser, int> userRights = new Dictionary<IdentityUser, int>();
        private List<IdentityUser> userList = new List<IdentityUser>();
        private List<IdentityUser> usersFromProject = new List<IdentityUser>();
        private List<IdentityUser> actualUser = new List<IdentityUser>();


        public ProjectController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            var projectList = _context.Projects.ToList();
            var storyList = _context.UserStorys.ToList();

            ViewBag.Projects = projectList;
            ViewBag.UserStories = storyList;

            Dictionary<Project, int> rightsOfActualUser = new Dictionary<Project, int>();

            string loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            foreach (Project project in projectList)
            {
                if (_context.ProjectUsers.Any(u => u.UserID == loggedInUserId && u.ProjectID == project.id))
                {
                    rightsOfActualUser.Add(project, _context.ProjectUsers.Where(u => u.UserID == loggedInUserId && u.ProjectID == project.id).Select(u => u.Admin).FirstOrDefault());
                }
            }

            ViewBag.rightsProjects = rightsOfActualUser;
            return View("Index");
        }




        /*[HttpPost]
        public IActionResult ChangeDifficult(int projectid, double DifficultyEstimated)
        {
            Project project = _context.Projects.Where(_u => _u.id == projectid).FirstOrDefault();
            project.DifficultyEstimated = DifficultyEstimated; 
            _context.Projects.Update(project);
            _context.SaveChanges();
            return Index();
        }*/





        //gets the UserRoles and all User
        public Dictionary<IdentityUser, int> GetUserRoles(int projectId)
        {

            LoadUserFromProject(projectId);

            LoadActiveUser();

            foreach (IdentityUser user in usersFromProject)
            {
                int adminRight = _context.ProjectUsers.Where(u => u.UserID == user.Id && u.ProjectID == projectId).Select(u => u.Admin).SingleOrDefault();
                userRights.Add(user, adminRight);
            }


            ViewBag.UserRights = userRights;
            ViewBag.ProjectID = projectId;

            return userRights;
        }

        public IActionResult EditUserRoles(string userId, int projectId)
        {
            IdentityUser user = _context.Users.Where(u => u.Id == userId).FirstOrDefault();

            userRights.Add(user, 1);

            Project project = _context.Projects.Where(u => u.id == projectId).FirstOrDefault();
            ProjectUser pUser = new ProjectUser(projectId, user.Id, 1);
            _context.ProjectUsers.Add(pUser);

            _context.SaveChanges();

            LoadUserFromProject(projectId);
            LoadActiveUser();

            return RedirectToAction("CreateEdit", new { id = projectId });
        }

        public void CreateUserRoles(int projectId, string[] checkedElements)
        {
            List<IdentityUser> users = new List<IdentityUser>();

            foreach (string element in checkedElements) {
                IdentityUser user = _context.Users.Where(u => u.Id == element).FirstOrDefault();
                users.Add(user);
                userRights.Add(user, 1);
                Project project = _context.Projects.Where(u => u.id == projectId).FirstOrDefault();
                ProjectUser pUser = new ProjectUser(projectId, user.Id, 1);
                _context.ProjectUsers.Add(pUser);
            }

            _context.SaveChanges();

            LoadUserFromProject(projectId);
            LoadActiveUser();

        }

        public void LoadUserFromProject(int projectId)
        {
            var usersHelp = _context.ProjectUsers.Where(u => u.ProjectID == projectId).Select(x => x.UserID).ToList();

            for (int i = 0; i < usersHelp.Count(); i++)
            {
                usersFromProject.Add(_context.Users.Where(u => u.Id == usersHelp[i].ToString()).SingleOrDefault());
            }

        }

        public void LoadActiveUser()
        {
            var allUser = _context.Users.FromSqlRaw("SELECT * FROM dbo.AspNetUsers").ToList();
            userList = allUser;

            string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            IdentityUser user = _context.Users.Where(u => u.Id == userId).FirstOrDefault();
            userList.Remove(user);
            actualUser = userList.Except(usersFromProject).ToList();
            ViewBag.allUser = actualUser;

        }

        //DeleteUser
        public int DeleteUser(string userId, int projectId)
        {
            ProjectUser pu = _context.ProjectUsers.Where(u => u.UserID == userId && u.ProjectID == projectId).FirstOrDefault();

            if(pu.Admin == 0)
            {
                string actualUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                IdentityUser user = _context.Users.Where(u => u.Id == userId).FirstOrDefault();

                if(pu.UserID == userId)
                {
                    int anzAdm = _context.ProjectUsers.Where(u => u.ProjectID == projectId && u.Admin == 0).Count();
                    if(anzAdm == 1)
                    {
                        return 1;
                    }
                }
            }

            List<UserStoryUser> usu = _context.UserStoryUsers.Where(u => u.UserID == userId).ToList();
            _context.UserStoryUsers.RemoveRange(usu);

            _context.ProjectUsers.Remove(pu);
            _context.SaveChanges();

            return 2;

        }

        //EditProject
        public IActionResult CreateEdit(int id)
        {

            GetUserRoles(id);

            var projectInDb = _context.Projects.Find(id);
            if (projectInDb == null)
            {
                return NotFound();
            }
            return View("CreateEditProject", projectInDb);
        }

        //Project Info
        public IActionResult Info(int id)
        {
            GetUserRoles(id);

            var projectInDb = _context.Projects.Find(id);
            if (projectInDb == null)
            {
                return NotFound();
            }
            return View("InfoProject", projectInDb);
        }

        //EntityCreate
        public IActionResult Create()
        {
            Project project = new Project("", "", "");
            _context.Projects.Add(project);
            _context.SaveChanges();
            ViewBag.projectIdNew = project.id;

            return View("CreateProject");
        }
        //CreateNamePage
        public IActionResult CreateName(int projectId, String projectName)
        {
            Project project = _context.Projects.Where(u => u.id == projectId).FirstOrDefault();

            if (projectName == null)
            {
                project.projectName = "!!!PleaseEnterName!!!";
            }
            else
            {
                project.projectName = projectName;
            }
            _context.Projects.Update(project);
            _context.SaveChanges();
            ViewBag.projectIdNew = project.id;


            return View("CreateProjectTime");
        }
        //CreateTimePage
        public IActionResult CreateTime(int projectId, String tense)
        {
            Project project = _context.Projects.Where(u => u.id == projectId).FirstOrDefault();
            project.tense = tense;
            _context.Projects.Update(project);
            _context.SaveChanges();
            ViewBag.projectIdNew = project.id;

            return View("CreateProjectDescription");
        }
        //CreateDescriptionPage
        public IActionResult CreateDescripiton(int projectId, String description)
        {
            IdentityUser user = _context.Users.Where(u => u.Id == User.FindFirstValue(ClaimTypes.NameIdentifier)).FirstOrDefault();
            Project project = _context.Projects.Where(u => u.id == projectId).FirstOrDefault();
            if (project.description == "")
            {
                project.description = description;
                _context.Projects.Update(project);
            }
            ProjectUser pu = new ProjectUser(projectId, user.Id, 0);
            ProjectUser helpUser = _context.ProjectUsers.Where(u => u.ProjectID == projectId && u.UserID == user.Id).FirstOrDefault();
            if (!_context.ProjectUsers.Contains(helpUser))
            {
                _context.ProjectUsers.Add(pu);
            }
            _context.SaveChanges();
            usersFromProject.Remove(user);
            ViewBag.projectIdNew = project.id;

            GetUserRoles(projectId);

            return View("CreateProjectAddUser");
        }

        public void MakeAdmin(string userId, int projectId)
        {
            ProjectUser pu = _context.ProjectUsers.Where(u => u.UserID == userId && u.ProjectID == projectId).FirstOrDefault();
            pu.Admin = 0;
            _context.ProjectUsers.Update(pu);
            _context.SaveChanges();
        }


        [HttpPost]
        public IActionResult CreateEditProject(Project project)
        {
            if (project.id == 0)
            {
                _context.Projects.Add(project);
                _context.SaveChanges();

                int id = project.id;
                var userID = User.FindFirstValue(ClaimTypes.NameIdentifier);

                var projectUser = new ProjectUser(id, userID, 0);

                _context.ProjectUsers.Add(projectUser);
            }
            else
            {
                _context.Projects.Update(project);
            }

            _context.SaveChanges();
            GetUserRoles(project.id);


            return RedirectToAction("Index");
        }

        public IActionResult DeleteProject(int id)
        {
            var projectInDb = _context.Projects.Find(id);

            if (projectInDb == null)
            {
                return NotFound();
            }
            List<ProjectUser> pu = new List<ProjectUser>();
            foreach(ProjectUser projectUser in _context.ProjectUsers.Where(u => u.ProjectID == id))
            {
                pu.Add(projectUser);
            }
            _context.ProjectUsers.RemoveRange(pu);
            _context.Projects.Remove(projectInDb);

            List<UserStory> us = new List<UserStory>();
            us = _context.UserStorys.Where(u => u.project_id == id).ToList();
            _context.UserStorys.RemoveRange(us);
            List<UserStoryUser> usu = new List<UserStoryUser>();
            List<UploadFile> uploadFiles = new List<UploadFile>();

            foreach (UserStory userStory in us)
            {
                usu.AddRange(_context.UserStoryUsers.Where(u => u.UserStoryID == userStory.id).ToList());
                uploadFiles.AddRange(_context.UploadFiles.Where(upload => upload.userStory == userStory).ToList());
            }
            _context.UserStoryUsers.RemoveRange(usu);
            _context.UploadFiles.RemoveRange(uploadFiles);

            
            
            List<Complexity> complexityList = _context.Complexities.Where(comp => comp.ProjectId == id).ToList();
            _context.Complexities.RemoveRange(complexityList);

            _context.SaveChanges();
            try
            {
                var dir = new DirectoryInfo(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/Files/" + id));
                dir.Attributes = dir.Attributes & ~FileAttributes.ReadOnly;
                dir.Delete(true);
            }
            catch (IOException ex)
            {
                Console.Write(ex);
            }
            return RedirectToAction("Index");
        }

        public IActionResult setIdFromJs(string str_projectId)
        {
            int projectId = Int32.Parse(str_projectId);

            return RedirectToAction("CreateEdit", projectId);
        }


        public JsonResult ChangeTense(string str_projectId, string tense)
        {
            int projectId = Int32.Parse(str_projectId);

            Project project = _context.Projects.Where(u => u.id == projectId).FirstOrDefault();

            project.tense = tense;

            _context.Projects.Update(project);
            _context.SaveChanges();

            return Json(new { Url = "../" });
        }
    }
}
