using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectManagementApplication.Data;
using ProjectManagementApplication.Models;
using System.Collections.Generic;

namespace ProjectManagementApplication.Controllers
{
    public class ComplexityController : Controller
    {
        private readonly ApplicationDbContext _context;


        public IActionResult Index()
        {
            return View("Index");
        }


        public void KomplexitätBerechnen()
        {
        }

        public IActionResult CreateEditComplexity(Complexity complexity, int pid)
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

            return RedirectToAction("Index");
        }

        public IActionResult DeleteComplexity(int id, int pid)
        {
            var complexityDb = _context.Complexities.Find(id);

            if(complexityDb == null)
            {
                return NotFound();
            }

            _context.Complexities.Remove(complexityDb);
            _context.SaveChanges();

            return RedirectToAction("Index");
        }


    }
}
