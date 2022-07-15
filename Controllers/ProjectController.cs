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

        public IActionResult CreateEdit(int id)
        {
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

                var ProjectUser = new ProjectUser(id, userID, 0);

                _context.ProjectUsers.Add(ProjectUser);
            }
            else
            {
                _context.Projects.Update(project);
            }


            _context.SaveChanges();

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
