using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ProjectManagementApplication.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ProjectManagementApplication.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public DbSet<UserStory> UserStorys {get; set;}
        public DbSet<Project> Projects { get; set; }
        public DbSet<ProjectUser> ProjectUsers { get; set; }
        public DbSet<UserStoryUser> UserStoryUsers { get; set; }
        public DbSet<Complexity> Complexities { get; set; }
        public DbSet<UploadFile> UploadFiles { get; set; }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {}
    }
}
