using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectManagementApplication.Models
{
    public class UserStory
    {

        public int id { get; set; }
        public int project_id { get; set; }
        public String name { get; set; }
        public String description { get; set; }
        public int state { get; set; }
        public DateTime startDate { get; set; }
        public DateTime endDate { get; set; }

        //[Required(ErrorMessage = "Please select files")]
        [NotMapped]
        public List<IFormFile> Files { get; set; }

    }
}
