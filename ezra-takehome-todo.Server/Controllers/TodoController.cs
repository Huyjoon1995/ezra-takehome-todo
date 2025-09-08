using ezra_takehome_todo.Server.Data;
using ezra_takehome_todo.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace ezra_takehome_todo.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // Require JWT authentication for all endpoints
    public class TodoController: ControllerBase
    {
        private readonly TodoDbContext _context;

        public TodoController(TodoDbContext context)
        {
            _context = context;
        }

        // Test endpoint to verify server is working
        [HttpGet("test")]
        [AllowAnonymous]
        public IActionResult Test()
        {
            return Ok(new { message = "Server is working", timestamp = DateTime.UtcNow });
        }

        // Test endpoint to verify JWT token
        [HttpGet("token-test")]
        public IActionResult TokenTest()
        {
            var claims = User.Claims.Select(c => new { c.Type, c.Value }).ToList();
            return Ok(new { 
                message = "Token is valid", 
                isAuthenticated = User.Identity?.IsAuthenticated,
                name = User.Identity?.Name,
                claims = claims,
                timestamp = DateTime.UtcNow 
            });
        }

        // GET: api/Todo
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoItem>>> GetTodos()
        {
            var userId = User.Identity?.Name;
            var todos = await _context.Todos.Where(t => t.UserId == userId).ToListAsync();
            return Ok(todos);
        }

        // GET: api/Todo/{id} -> retrieve individual todo item
        [HttpGet("{id}")]
        public async Task<ActionResult<TodoItem>> GetTodoById(int id)
        {
            var userId = User.Identity?.Name;
            var todo = await _context.Todos.FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);
            if (todo == null)
            {
                return NotFound();
            }
            return todo;
        }

        // POST: api/Todo
        [HttpPost]
        public async Task<ActionResult<TodoItem>> CreateTodo([FromBody] TodoItem todo)
        {
            if (todo == null || string.IsNullOrWhiteSpace(todo.Title))
            {
                return BadRequest();
            }
            var userId = User.Identity?.Name;
            if (userId != null)
            {
                todo.UserId = userId;
            }
            todo.CreatedAt = DateTime.UtcNow;
            _context.Todos.Add(todo);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTodoById), new { id = todo.Id }, todo);
        }

        // Put: api/Todo/{id} -> toggle completion
        [HttpPut("{id}")]
        public async Task<ActionResult<TodoItem>> ToggleTodo(int id)
        {
            var userId = User.Identity?.Name;
            var todo = await _context.Todos.FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);
            if (todo == null) return NotFound();
            todo.IsCompleted = !todo.IsCompleted;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // Delete: api/Todo/{id} -> delete task
        [HttpDelete("{id}")]
        public async Task<ActionResult<TodoItem>> DeleteTodo(int id)
        {
            var userId = User.Identity?.Name;
            var todo = await _context.Todos.FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);
            if (todo == null) return NotFound();

            _context.Todos.Remove(todo);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
