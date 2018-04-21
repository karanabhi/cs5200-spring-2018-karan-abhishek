/**
 * 
 */
package edu.northeastern.cs5200.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import edu.northeastern.cs5200.domainentities.Doctor;
import edu.northeastern.cs5200.domainentities.Patient;
import edu.northeastern.cs5200.repository.DoctorRepository;
import edu.northeastern.cs5200.repository.PatientRepository;

/**
 * @author Abhishek Karan
 *
 */
@RestController
public class CustomController {

	@Autowired
	PatientRepository patientRepository;

	@Autowired
	DoctorRepository doctorRepository;

	@PostMapping("/api/v1/patientLogin")
	public Iterable<Patient> patientLogin(@RequestBody Patient patient) {

		if (patient.getEmail() != null && patient.getPassword() != null) {
			return patientRepository.findPatientByCredentials(patient.getEmail(), patient.getPassword());
		}
		return null;
	}

	@PostMapping("/api/v1/doctorLogin")
	public Iterable<Doctor> doctorLogin(@RequestBody Doctor doctor) {

		if (doctor.getEmail() != null && doctor.getPassword() != null) {
			return doctorRepository.findDoctortByCredentials(doctor.getEmail(), doctor.getPassword());
		}
		return null;
	}
}
