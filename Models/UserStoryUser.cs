using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectManagementApplication.Models
{
    public class UserStoryUser
    {
        public UserStoryUser(int UserStoryID, string UserID)
        {
            this.UserStoryID = UserStoryID;
            this.UserID = UserID;
        }
        public int Id { get; set; }

        public int UserStoryID { get; set; }

        public string UserID { get; set; }

    }
}
