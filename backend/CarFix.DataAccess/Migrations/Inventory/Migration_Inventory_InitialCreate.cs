using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CarFix.DataAccess.Migrations.Inventory
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "InventoryItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PartName  = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    PartCode  = table.Column<string>(type: "nvarchar(50)",  maxLength: 50,  nullable: false),
                    Category  = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Supplier  = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Quantity  = table.Column<int>(type: "int", nullable: false),
                    UnitPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    IsActive  = table.Column<bool>(type: "bit", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InventoryItems", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(name: "InventoryItems");
        }
    }
}
