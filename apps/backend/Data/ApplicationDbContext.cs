using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : DbContext
{
  public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options): base(options)
  {
  }

  public DbSet<ConnectionTest> ConnectionTest { get; set; }
}
