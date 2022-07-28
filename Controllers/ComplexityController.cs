using Microsoft.AspNetCore.Mvc;

namespace ProjectManagementApplication.Controllers
{
    public class ComplexityController : Controller
    {

        public IActionResult Index()
        {
            return View("Index");
        }
    }
}
