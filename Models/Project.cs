using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectManagementApplication.Models
{
    public class Project
    {
        public Project(string projectName, string tense, string description)
        {
            this.projectName = projectName;
            this.tense = tense;
            this.description = description;
        }

        public Project(){}
        public int id { get; set; }

        public String projectName { get; set; }

        public String tense { get; set; }

        public String description { get; set; }

        public int difficulty { get; set; }
    }
}
