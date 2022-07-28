namespace ProjectManagementApplication.Models
{
    public class Complexity
    {
        public int id { get; set; }

        public int ProjectId { get; set; }

        public double Difficulty { get; set; }

        public double EstimatedDifficulty { get; set; }

        public double EstimatedWeighting { get; set; }

        public short EstimatedChecked { get; set; }

        public double JiraWeighting { get; set; }

        public short JiraChecked { get; set; }

        public double GerritWeighting { get; set; }

        public short GerritChecked { get; set; }

        public double CodeCompareWeighting { get; set; }

        public short CodeCompareChecked { get; set; }


    }
}
