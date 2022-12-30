﻿namespace ProjectManagementApplication.Models
{
    public class UploadFile
    {
        public UploadFile(string name, string contentType, byte[] data)
        {
            Name = name;
            ContentType = contentType;
            Data = data;
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string ContentType { get; set; }
        public byte[] Data { get; set; }
    }
}
