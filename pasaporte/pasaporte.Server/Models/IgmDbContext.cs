using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace pasaporte.Server.Models;

public partial class IgmDbContext : DbContext
{
    public IgmDbContext()
    {
    }

    public IgmDbContext(DbContextOptions<IgmDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Pai> Pais { get; set; }

    public virtual DbSet<Pasaporte> Pasaportes { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)

        => optionsBuilder.UseSqlServer("Server=(local);Database=igm_db;Integrated Security=True;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Pai>(entity =>
        {
            entity.HasKey(e => e.IdPais).HasName("PK__Pais__0941A3A7612E57A1");

            entity.Property(e => e.IdPais)
                .ValueGeneratedNever()
                .HasColumnName("id_pais");
            entity.Property(e => e.NombrePais)
                .HasMaxLength(100)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Pasaporte>(entity =>
        {
            entity.HasKey(e => e.IdPasaporte).HasName("PK__Pasaport__7F9073603F104028");

            entity.Property(e => e.IdPasaporte).HasColumnName("id_pasaporte");
            entity.Property(e => e.IdPais).HasColumnName("Id_pais");
            entity.Property(e => e.IdUsuario).HasColumnName("Id_usuario");
            entity.Property(e => e.Lugar)
                .HasMaxLength(100)
                .IsUnicode(false);

            entity.HasOne(d => d.IdPaisNavigation).WithMany(p => p.Pasaportes)
                .HasForeignKey(d => d.IdPais)
                .HasConstraintName("FK__Pasaporte__Id_pa__3C69FB99");

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.Pasaportes)
                .HasForeignKey(d => d.IdUsuario)
                .HasConstraintName("FK__Pasaporte__Id_us__3D5E1FD2");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.IdUsuario).HasName("PK__Usuarios__4E3E04ADC245DFC3");

            entity.Property(e => e.IdUsuario)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("id_usuario");
            entity.Property(e => e.Apellidos)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Contrasenia)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Nombres)
                .HasMaxLength(100)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
