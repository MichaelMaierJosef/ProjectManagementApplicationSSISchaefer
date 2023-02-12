namespace ProjectManagementApplication.Models
{
    public class Complexity
    {   
        /*
        public Complexity(int id, int projectId, string complexityName, string complexityDescription, bool complexityOn, int complexityWeight, int complexityScale)
        {
            this.id = id;
            ProjectId = projectId;
            ComplexityName = complexityName;
            ComplexityDescription = complexityDescription;
            ComplexityOn = complexityOn;
            ComplexityWeight = complexityWeight;
            ComplexityScale = complexityScale;
        }
        */

        public int id { get; set; }

        public int ProjectId { get; set; }

        public string ComplexityName { get; set; }

        public string ComplexityDescription { get; set; }

        public bool ComplexityOn { get; set; }


        public int ComplexityWeight { get; set; }

        public int ComplexityScale { get; set; }







    }
}
