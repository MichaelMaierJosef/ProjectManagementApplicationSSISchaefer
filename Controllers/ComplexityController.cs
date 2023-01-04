using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using ProjectManagementApplication.Data;
using ProjectManagementApplication.Models;
using System.Collections.Generic;
using System.Linq;

namespace ProjectManagementApplication.Controllers
{
    public class ComplexityController : Controller
    {
        private readonly ApplicationDbContext _context;
        public ComplexityController(ApplicationDbContext context) { _context = context; }


        public ComplexityController(ApplicationDbContext context)
        {
            _context = context;
        }


        public IActionResult Index(int projectid, string projectName)
        {
            var complexityList = _context.Complexities.ToList();
            List<Complexity> complexityProjectList = new List<Complexity>();

            foreach (Complexity complexity in complexityList)
            {
                if (complexity.ProjectId == projectid)
                {
                    complexityProjectList.Add(complexity);
                }
            }

            ViewBag.currentProjectId = projectid;
            ViewBag.currentProjectName = projectName;
            ViewBag.Complexities = complexityProjectList;

            return View("Index");
        }


        public void KomplexitätBerechnen()
        {
        }

        public IActionResult CreateEditComplexity(Complexity complexity, int pid, string pname)
        {
            complexity.ProjectId = pid;
            
            if(complexity.id == 0)
            {
                _context.Complexities.Add(complexity);
            }
            else
            {
                _context.Complexities.Update(complexity);
            }


            _context.SaveChanges();

            return RedirectToAction("Index", new { projectid = pid, projectName = pname });
        }

        public IActionResult DeleteComplexity(int id, int pid, string pname)
        {
            var complexityDb = _context.Complexities.Find(id);

            if(complexityDb == null)
            {
                return NotFound();
            }

            _context.Complexities.Remove(complexityDb);
            _context.SaveChanges();

            return RedirectToAction("Index", new { projectid = pid, projectName = pname });
        }


    }
}
