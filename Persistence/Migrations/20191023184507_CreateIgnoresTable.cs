using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class CreateIgnoresTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.CreateTable(
                name: "Ignores",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    IgWord = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ignores", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Ignores");

            migrationBuilder.CreateTable(
                name: "Ignores",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    IgWord = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ignores", x => x.Id);
                });
        }
    }
}
