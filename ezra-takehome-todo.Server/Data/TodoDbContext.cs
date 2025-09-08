using ezra_takehome_todo.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace ezra_takehome_todo.Server.Data
{
    public class TodoDbContext : DbContext
    {
        public TodoDbContext(DbContextOptions<TodoDbContext> options)
            : base(options)
        { }

        public DbSet<TodoItem> Todos { get; set; }
    }
}