using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class RelationWithAppointments : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.AddColumn<int>(
                name: "AppointmentId",
                table: "Prescriptions",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "AppointmentId",
                table: "LabTests",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "AppointmentId",
                table: "Diagnoses",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Diagnoses_AppointmentId",
                table: "Diagnoses",
                column: "AppointmentId");
            
            migrationBuilder.CreateIndex(
                name: "IX_Prescriptions_AppointmentId",
                table: "Prescriptions",
                column: "AppointmentId");
            
            migrationBuilder.CreateIndex(
                name: "IX_LabTests_AppointmentId",
                table: "LabTests",
                column: "AppointmentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Diagnoses_Appointments_AppointmentId",
                table: "Diagnoses",
                column: "AppointmentId",
                principalTable: "Appointments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_LabTests_Appointments_AppointmentId",
                table: "LabTests",
                column: "AppointmentId",
                principalTable: "Appointments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Prescriptions_Appointments_AppointmentId",
                table: "Prescriptions",
                column: "AppointmentId",
                principalTable: "Appointments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Diagnoses_Appointments_AppointmentId",
                table: "Diagnoses");

            migrationBuilder.DropForeignKey(
                name: "FK_LabTests_Appointments_AppointmentId",
                table: "LabTests");

            migrationBuilder.DropForeignKey(
                name: "FK_Prescriptions_Appointments_AppointmentId",
                table: "Prescriptions");

            migrationBuilder.DropIndex(
                name: "IX_LabTests_AppointmentId",
                table: "LabTests");

            migrationBuilder.DropColumn(
                name: "AppointmentId",
                table: "LabTests");
            
            migrationBuilder.DropColumn(
                name: "AppointmentId",
                table: "Diagnoses");
            
            migrationBuilder.DropColumn(
                name: "AppointmentId",
                table: "Prescriptions");
        }
    }
}
