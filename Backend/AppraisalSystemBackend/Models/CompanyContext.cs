using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace AppraisalSystemBackend.Models
{
    public partial class CompanyContext : DbContext
    {
        public CompanyContext()
        {
        }

        public CompanyContext(DbContextOptions<CompanyContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Employee> Employees { get; set; }
        public virtual DbSet<Feedback> Feedbacks { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source=DESKTOP-T7843PQ\\SQLEXPRESS;Initial Catalog=Company;User ID=testuser;Password=password");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Employee>(entity =>
            {
                entity.ToTable("Employee");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("ID");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnType("text");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Password).HasColumnType("text");
            });

            modelBuilder.Entity<Feedback>(entity =>
            {
                entity.ToTable("Feedback");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.AssignedId).HasColumnName("AssignedID");

                entity.Property(e => e.Description).HasColumnType("text");

                entity.Property(e => e.EmpId).HasColumnName("EmpID");

                entity.HasOne(d => d.Emp)
                    .WithMany(p => p.Feedbacks)
                    .HasForeignKey(d => d.EmpId)
                    .HasConstraintName("FK__Feedback__EmpID__276EDEB3");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
