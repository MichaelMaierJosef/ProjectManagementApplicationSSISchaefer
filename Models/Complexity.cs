namespace ProjectManagementApplication.Models
{
    public class Complexity
    {
        public Complexity()
        {
        }
        public Complexity(int projectId, string complexityName, string complexityDescription, bool complexityOn, bool complexityCustom, int complexityWeight, int complexityScale)
        {
            ProjectId = projectId;
            ComplexityName = complexityName;
            ComplexityDescription = complexityDescription;
            ComplexityOn = complexityOn;
            ComplexityCustom = complexityCustom;
            ComplexityWeight = complexityWeight;
            ComplexityScale = complexityScale;
        }

        public int id { get; set; }

        public int ProjectId { get; set; }

        public string ComplexityName { get; set; }

        public string ComplexityDescription { get; set; }

        public bool ComplexityOn { get; set; }

        public bool ComplexityCustom { get; set; }


        public int ComplexityWeight { get; set; }

        public int ComplexityScale { get; set; }







    }
}
