package edu.northeastern.cs5200.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import edu.northeastern.cs5200.domainentities.Doctor;
import edu.northeastern.cs5200.repository.DoctorRepository;

@RestController
public class DoctorController {

	@Autowired
	DoctorRepository doctorRepository;

	@GetMapping("/api/v1/doctor")
	public Iterable<Doctor> findAllDoctors() {
		return doctorRepository.findAll();
	}

	@GetMapping("/api/v1/doctor/{doctorId}")
	public Doctor findDoctorById(@PathVariable("doctorId") int doctorId) {
		return doctorRepository.findOne(doctorId);
	}

	@PostMapping("/api/v1/doctor")
	public Doctor createDoctor(@RequestBody Doctor doctor) {
		return doctorRepository.save(doctor);
	}

	@PutMapping("/api/v1/doctor/{doctorId}")
	public Doctor updateDoctor(@PathVariable("doctorId") int id, @RequestBody Doctor newdoctor) {
		Doctor doctor = doctorRepository.findOne(id);
		doctor.set(newdoctor);
		return doctorRepository.save(doctor);
	}

	@DeleteMapping("/api/v1/doctor/{doctorId}")
	public void deleteDoctor(@PathVariable("doctorId") int id) {
		doctorRepository.delete(id);
	}

}
