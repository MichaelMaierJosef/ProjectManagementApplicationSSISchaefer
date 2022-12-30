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
        public UserStory( int project_id, string name, string description, int state, DateTime startDate, DateTime endDate)
        {
            this.project_id = project_id;
            this.name = name;
            this.description = description;
            this.state = state;
            this.startDate = startDate;
            this.endDate = endDate;
            this.files = new List<UploadFile>();
        }

        public int id { get; set; }
        public int project_id { get; set; }
        public String name { get; set; }
        public String description { get; set; }
        public int state { get; set; }
        public DateTime startDate { get; set; }
        public DateTime endDate { get; set; }

        public ICollection<UploadFile> files { get; set; }
    }
}
