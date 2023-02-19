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



        public IActionResult Index(int projectid, string projectName)
        {
            var complexityList = _context.Complexities.ToList();
            List<Complexity> standardComplexityList = new List<Complexity>();
            List<Complexity> customComplexityList = new List<Complexity>();

            /*
            List<Complexity> defaultComplexityList = new List<Complexity>();
            defaultComplexityList.Add(new Complexity(0,projectid,"wow","",false,0,0));
            defaultComplexityList.Add(new Complexity(0,projectid,"wow","",false,0,0));
            defaultComplexityList.Add(new Complexity(0,projectid,"wow","",false,0,0));
            defaultComplexityList.Add(new Complexity(0,projectid,"wow","",false,0,0));
            if(complexityList.Contains()
            _context.Complexities.Add(complexity);
            */

            foreach (Complexity complexity in complexityList)
            {
                if (complexity.ProjectId == projectid)
                {
                    if (complexity.ComplexityCustom)
                    {
                        customComplexityList.Add(complexity);
                    }
                    else
                    {
                        standardComplexityList.Add(complexity);
                    }
                }
            }

            ViewBag.currentProjectId = projectid;
            ViewBag.currentProjectName = projectName;
            ViewBag.customComplexities = customComplexityList;
            ViewBag.standardComplexities = standardComplexityList;
            ViewBag.currentComplexityScale = CalculateComplexity(projectid);

            return View("Index");
        }


        public double CalculateComplexity(int projectid)
        {
            var complexityList = _context.Complexities.ToList();
            var complexityScale = 0;

            foreach (Complexity complexity in complexityList)
            {
                if (complexity.ProjectId == projectid && complexity.ComplexityOn)
                {
                    complexityScale += complexity.ComplexityScale * complexity.ComplexityWeight / 100;
                    
                }
            }

            return complexityScale;

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

        public double UpdateScale(int id, int pid, string pname, int scale)
        {
            var complexity = _context.Complexities.Find(id);

            if (complexity == null)
            {
                return -1;
            }

            complexity.ComplexityScale = scale;

            _context.Complexities.Update(complexity);
            _context.SaveChanges();

            return CalculateComplexity(pid);
        }
        public double UpdateWeight(int id, int pid, string pname, int weight)
        {
            var complexity = _context.Complexities.Find(id);

            if (complexity == null)
            {
                return -1;
            }

            complexity.ComplexityWeight = weight;

            _context.Complexities.Update(complexity);
            _context.SaveChanges();

            return CalculateComplexity(pid);
        }

        public double SwitchComplexity(int id, int pid, string pname)
        {
            var complexity = _context.Complexities.Find(id);

            if (complexity == null)
            {
                return -1;
            }

            complexity.ComplexityOn = !complexity.ComplexityOn;

            _context.Complexities.Update(complexity);
            _context.SaveChanges();

            return CalculateComplexity(pid);
        }


    }
}
