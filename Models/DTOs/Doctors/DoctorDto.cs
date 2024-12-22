using Models.DTOs.Users;

namespace Models.DTOs.Doctors;

public class DoctorDto
{
    public int Id { get; set; }
    public string PhoneNo { get; set; }
    public string Specialization { get; set; }
    public UserDoctorDto? User { get; set; }
}