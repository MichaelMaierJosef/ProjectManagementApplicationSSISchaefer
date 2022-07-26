using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProjectManagementApplication.Data;
using ProjectManagementApplication.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectManagementApplication.Controllers
{
    [Authorize]
    public class UserStoryController : Controller
    {

        private readonly ApplicationDbContext _context;

        public UserStoryController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index(int projectid, string projectName)
        {
            var storyList = _context.UserStorys.ToList();
            List<UserStory> projectStoryList = new List<UserStory>();

            foreach (UserStory story in storyList)
            {
                if (story.project_id == projectid)
                {
                    projectStoryList.Add(story);
                }
            }

            ViewBag.currentProjectId = projectid;
            ViewBag.currentProjectName = projectName;
            ViewBag.UserStorys = projectStoryList;

            return View("Index");
        }

        public JsonResult GetUserStory(int userstoryId)
        {
            UserStory us = _context.UserStorys.Where(u => u.id == userstoryId).FirstOrDefault();
            return Json(us);
        }

        [HttpPost]
        public IActionResult EditUserStory(UserStory story, int pid, string pname)
        {
            story.project_id = pid;

            if (story.id == 0)
            {
                _context.UserStorys.Add(story);
            }
            else
            {
                _context.UserStorys.Update(story);
            }

            _context.SaveChanges();

            return RedirectToAction("Index", new { projectid = pid, projectName = pname });
        }

        public IActionResult CreateUserStory(UserStory story, int pid, string pname)
        {
            story.project_id = pid;

            if (story.id == 0)
            {
                _context.UserStorys.Add(story);
            }
            else
            {
                _context.UserStorys.Update(story);
            }

            _context.SaveChanges();

            return RedirectToAction("Index", new { projectid = pid, projectName = pname });
        }


        public IActionResult DeleteStory(int id, int pid, string pname)
        {
            var storyDB = _context.UserStorys.Find(id);

            if (storyDB == null)
            {
                return NotFound();
            }

            _context.UserStorys.Remove(storyDB);
            _context.SaveChanges();

            return RedirectToAction("Index", new { projectid = pid, projectName = pname });
        }

        [HttpPost]
        public IActionResult ChangeStateUserStory(int storyid, int pid, string pName)
        {

            /*switch (story.state)
            {
                case 0:
                    story.state = 1;
                    break;
                case 1:
                    story.state = 2;
                    break;
                case 2:
                    story.state = 0;
                    break;
            }*/
            UserStory story = _context.UserStorys.Where(u => u.id == storyid).FirstOrDefault();

            if (story.state == 0)
            {
                story.state = 2;
            }
            else
            {
                story.state = 0;
            }

            _context.UserStorys.Update(story);
            _context.SaveChanges();

            return Index(pid, pName);
        }

        [HttpPost]
        public IActionResult MultiUpload(int id/*UserStoryId*/, List<IFormFile> Files, int projectid, string projectname)
        {
            if (Files.Count > 0)
            {
                foreach (var file in Files)
                {

                    string path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/Files/" + projectid + "/" + id);

                    //create folder if not exist
                    if (!Directory.Exists(path))
                        Directory.CreateDirectory(path);


                    string fileNameWithPath = Path.Combine(path, file.FileName);

                    using (var stream = new FileStream(fileNameWithPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                }
            }

            UserStory us = _context.UserStorys.Where(u => u.id == id).FirstOrDefault();
            if (us.Files == null)
            {
                us.Files = new List<IFormFile>();
            }
            foreach (IFormFile file in Files)
            {
                us.Files.Add(file);
            }
            _context.UserStorys.Update(us);
            _context.SaveChanges();

            return Index(projectid, projectname);
        }

    }
}


