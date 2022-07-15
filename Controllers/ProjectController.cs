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

            return View();
        }

        //gets the UserRoles and all User
        public Dictionary<IdentityUser,int> GetUserRoles(int projectId)
        {

            LoadUserFromProject(projectId);

            foreach(IdentityUser user in usersFromProject)
            {
                int adminRight = _context.ProjectUsers.Where(u => u.UserID == user.Id && u.ProjectID == projectId).Select(u => u.Admin).SingleOrDefault();
                userRights.Add(user, adminRight);
            }

            LoadActiveUser();

            ViewBag.UserRights = userRights;
            ViewBag.allUser = actualUser;
            ViewBag.ProjectID = projectId;
            
            return userRights;
        }

        public IActionResult EditUserRoles(string userId, int projectId)
        {
            IdentityUser user = _context.Users.Where(u => u.Id == userId).FirstOrDefault();

            userRights.Add(user, 0);

            Project project = _context.Projects.Where(u => u.id == projectId).FirstOrDefault();
            ProjectUser pUser = new ProjectUser(projectId, user.Id, 1);
            _context.ProjectUsers.Add(pUser);

            _context.SaveChanges();

            LoadUserFromProject(projectId);
            LoadActiveUser();

            return RedirectToAction("CreateEdit", new { id = projectId });
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

            actualUser = userList.Except(usersFromProject).ToList();

        }

        public IActionResult CreateEdit(int id)
        {

            GetUserRoles(id);

            if (id == 0)
            {
                return View("CreateEditProject");
            }

            var projectInDb = _context.Projects.Find(id);

            if (projectInDb == null)
            {
                return NotFound();
            }

            return View("CreateEditProject", projectInDb);
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
            } else
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

            _context.Projects.Remove(projectInDb);
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

            _context.Projects.FromSqlRaw("");

            return Json(project);
        }
    }
}
