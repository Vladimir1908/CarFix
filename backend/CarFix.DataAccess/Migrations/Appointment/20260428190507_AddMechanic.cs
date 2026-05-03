using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CarFix.DataAccess.Migrations.Appointment
{
    /// <inheritdoc />
    public partial class AddMechanic : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Mechanic",
                table: "Appointments",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Mechanic",
                table: "Appointments");
        }
    }
}
