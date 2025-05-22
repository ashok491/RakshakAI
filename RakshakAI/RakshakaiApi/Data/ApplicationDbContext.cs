using Microsoft.EntityFrameworkCore;
using RakshakaiApi.Models;

namespace RakshakaiApi.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Threat> Threats { get; set; }
        public DbSet<Zone> Zones { get; set; }
        public DbSet<Alert> Alerts { get; set; }
        public DbSet<Feed> Feeds { get; set; }
        public DbSet<ThreatZone> ThreatZones { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure many-to-many relationship between Threats and Zones
            modelBuilder.Entity<ThreatZone>()
                .HasKey(tz => new { tz.ThreatId, tz.ZoneId });

            modelBuilder.Entity<ThreatZone>()
                .HasOne(tz => tz.Threat)
                .WithMany(t => t.ThreatZones)
                .HasForeignKey(tz => tz.ThreatId);

            modelBuilder.Entity<ThreatZone>()
                .HasOne(tz => tz.Zone)
                .WithMany(z => z.ThreatZones)
                .HasForeignKey(tz => tz.ZoneId);

            // Seed initial data
            SeedData(modelBuilder);
        }

        private void SeedData(ModelBuilder modelBuilder)
        {
            // Seed Users
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = 1,
                    Username = "admin",
                    PasswordHash = "AQAAAAIAAYagAAAAELPMg12K5KsEWp95UW57cQK0XIlZhSdQEO3MmESJ+tJeDMk1+N1KP5Xu+rWdW7r0NQ==", // admin123
                    Name = "Administrator",
                    Role = "Admin",
                    CreatedAt = DateTime.UtcNow
                },
                new User
                {
                    Id = 2,
                    Username = "officer",
                    PasswordHash = "AQAAAAIAAYagAAAAEGq0S1hGx4bOkxB0IQlIUpTwB8+LLjqk1AqndSTXzVLBHQsKMveMCLGOlITNJ6kLhw==", // officer123
                    Name = "Lt. Singh",
                    Role = "Officer",
                    CreatedAt = DateTime.UtcNow
                }
            );

            // Seed Zones
            modelBuilder.Entity<Zone>().HasData(
                new Zone { Id = 1, Name = "Zone A", Status = "Active", CreatedAt = DateTime.UtcNow },
                new Zone { Id = 2, Name = "Zone B", Status = "Active", CreatedAt = DateTime.UtcNow },
                new Zone { Id = 3, Name = "Zone C", Status = "Active", CreatedAt = DateTime.UtcNow }
            );

            // Seed Threats
            modelBuilder.Entity<Threat>().HasData(
                new Threat { Id = 1, Description = "Terrorist activity detected", Severity = "High", PositionX = 30, PositionY = 40, CreatedAt = DateTime.UtcNow },
                new Threat { Id = 2, Description = "Suspicious movement detected", Severity = "High", PositionX = 35, PositionY = 55, CreatedAt = DateTime.UtcNow },
                new Threat { Id = 3, Description = "Arms smuggling detected", Severity = "High", PositionX = 45, PositionY = 75, CreatedAt = DateTime.UtcNow },
                new Threat { Id = 4, Description = "Unauthorized border crossing", Severity = "High", PositionX = 50, PositionY = 90, CreatedAt = DateTime.UtcNow }
            );

            // Associate Threats with Zones
            modelBuilder.Entity<ThreatZone>().HasData(
                new ThreatZone { ThreatId = 1, ZoneId = 1 },
                new ThreatZone { ThreatId = 2, ZoneId = 2 },
                new ThreatZone { ThreatId = 3, ZoneId = 3 },
                new ThreatZone { ThreatId = 4, ZoneId = 3 }
            );

            // Seed Alerts
            modelBuilder.Entity<Alert>().HasData(
                new Alert { Id = 1, Message = "Terrorist threat in Zone A", ZoneId = 1, Severity = "High", Timestamp = DateTime.UtcNow.AddMinutes(-15) },
                new Alert { Id = 2, Message = "Terrorist threat in Zone B", ZoneId = 2, Severity = "High", Timestamp = DateTime.UtcNow.AddMinutes(-30) },
                new Alert { Id = 3, Message = "Terrorist threat in Zone C", ZoneId = 3, Severity = "High", Timestamp = DateTime.UtcNow.AddMinutes(-45) }
            );

            // Seed Feeds
            modelBuilder.Entity<Feed>().HasData(
                new Feed { Id = 1, Type = "Patrol", Url = "https://images.pexels.com/photos/1184625/pexels-photo-1184625.jpeg", Status = "Active" },
                new Feed { Id = 2, Type = "City", Url = "https://images.pexels.com/photos/1068946/pexels-photo-1068946.jpeg", Status = "Active" },
                new Feed { Id = 3, Type = "Patrol", Url = "https://images.pexels.com/photos/1198507/pexels-photo-1198507.jpeg", Status = "Active" },
                new Feed { Id = 4, Type = "Urban", Url = "https://images.pexels.com/photos/275294/pexels-photo-275294.jpeg", Status = "Active" },
                new Feed { Id = 5, Type = "Urban", Url = "https://images.pexels.com/photos/1084510/pexels-photo-1084510.jpeg", Status = "Active" }
            );
        }
    }
}