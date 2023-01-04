namespace ProjectManagementApplication.Models
{
    public class Complexity
    {
        public int id { get; set; }

        public int ProjectId { get; set; }

        public string ComplexityName { get; set; }

        public string ComplexityDescription { get; set; }

        public bool ComplexityOn { get; set; }


        public int ComplexityWeight { get; set; }

        public int ComplexityScale { get; set; }





    }
}
