namespace ezra_takehome_todo.Server.Models
{
    public class TodoItem
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;

        public bool IsCompleted { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public string? UserId { get; set; }
    }
}
