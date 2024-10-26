using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace eAgenda.Infra.Orm.Migrations
{
    /// <inheritdoc />
    public partial class Update_Usuario : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TBCategoria_AspNetUsers_UsuarioId",
                table: "TBCategoria");

            migrationBuilder.DropForeignKey(
                name: "FK_TBCompromisso_AspNetUsers_UsuarioId",
                table: "TBCompromisso");

            migrationBuilder.DropForeignKey(
                name: "FK_TBContato_AspNetUsers_UsuarioId",
                table: "TBContato");

            migrationBuilder.DropForeignKey(
                name: "FK_TBDespesa_AspNetUsers_UsuarioId",
                table: "TBDespesa");

            migrationBuilder.DropForeignKey(
                name: "FK_TBTarefa_AspNetUsers_UsuarioId",
                table: "TBTarefa");

            migrationBuilder.AddForeignKey(
                name: "FK_TBCategoria_AspNetUsers_UsuarioId",
                table: "TBCategoria",
                column: "UsuarioId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TBCompromisso_AspNetUsers_UsuarioId",
                table: "TBCompromisso",
                column: "UsuarioId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TBContato_AspNetUsers_UsuarioId",
                table: "TBContato",
                column: "UsuarioId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TBDespesa_AspNetUsers_UsuarioId",
                table: "TBDespesa",
                column: "UsuarioId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TBTarefa_AspNetUsers_UsuarioId",
                table: "TBTarefa",
                column: "UsuarioId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TBCategoria_AspNetUsers_UsuarioId",
                table: "TBCategoria");

            migrationBuilder.DropForeignKey(
                name: "FK_TBCompromisso_AspNetUsers_UsuarioId",
                table: "TBCompromisso");

            migrationBuilder.DropForeignKey(
                name: "FK_TBContato_AspNetUsers_UsuarioId",
                table: "TBContato");

            migrationBuilder.DropForeignKey(
                name: "FK_TBDespesa_AspNetUsers_UsuarioId",
                table: "TBDespesa");

            migrationBuilder.DropForeignKey(
                name: "FK_TBTarefa_AspNetUsers_UsuarioId",
                table: "TBTarefa");

            migrationBuilder.AddForeignKey(
                name: "FK_TBCategoria_AspNetUsers_UsuarioId",
                table: "TBCategoria",
                column: "UsuarioId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TBCompromisso_AspNetUsers_UsuarioId",
                table: "TBCompromisso",
                column: "UsuarioId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TBContato_AspNetUsers_UsuarioId",
                table: "TBContato",
                column: "UsuarioId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TBDespesa_AspNetUsers_UsuarioId",
                table: "TBDespesa",
                column: "UsuarioId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TBTarefa_AspNetUsers_UsuarioId",
                table: "TBTarefa",
                column: "UsuarioId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
