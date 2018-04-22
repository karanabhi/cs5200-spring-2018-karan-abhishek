/**
 * 
 */
package edu.northeastern.cs5200.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import edu.northeastern.cs5200.daos.Patient2DoctorDao;
import edu.northeastern.cs5200.domainentities.Doctor;
import edu.northeastern.cs5200.domainentities.Patient;
import edu.northeastern.cs5200.domainentities.Patient2Doctor;
import edu.northeastern.cs5200.repository.BlogRepository;
import edu.northeastern.cs5200.repository.DoctorRepository;
import edu.northeastern.cs5200.repository.PatientRepository;

/**
 * @author Abhishek Karan
 *
 */
@RestController
public class PatientController {
	@Autowired
	PatientRepository patientRepository;

	@Autowired
	BlogRepository blogRepository;

	@Autowired
	DoctorRepository doctorRepository;

	@GetMapping("/api/v1/patient")
	public Iterable<Patient> findAllPatients() {
		return patientRepository.findAll();
	}

	@GetMapping("/api/v1/patient/{patientId}")
	public Patient findPatientById(@PathVariable("patientId") int patientId) {
		return patientRepository.findOne(patientId);
	}

	@PostMapping("/api/v1/patient")
	public Patient createPatient(@RequestBody Patient patient) {
		return patientRepository.save(patient);
	}

	@PutMapping("/api/v1/patient/{patientId}")
	public Patient updatePatient(@PathVariable("patientId") int id, @RequestBody Patient newPatient) {
		Patient patient = patientRepository.findOne(id);
		patient.set(newPatient);
		return patientRepository.save(patient);
	}

	@DeleteMapping("/api/v1/patient/{patientId}")
	public void deletePatient(@PathVariable("patientId") int id) {
		patientRepository.delete(id);
	}

	@PostMapping("/api/v1/patient/{pId}/doctor/{dId}")
	public void followBlogByPatients(@PathVariable("pId") int pId, @PathVariable("dId") int dId) {
		Patient patient = patientRepository.findOne(pId);
		Doctor doctor = doctorRepository.findOne(dId);
		Patient2DoctorDao p2dDao = Patient2DoctorDao.getInstance();
		Patient2Doctor p2d = new Patient2Doctor();
		p2d.setDoctor(doctor);
		p2d.setPatient(patient);
		p2dDao.createPatient2Doctor(p2d);

	}

	@GetMapping("/api/v1/patient/doctor")
	public List<Patient2Doctor> followDoctorsByPatient() {
		Patient2DoctorDao p2dDao = Patient2DoctorDao.getInstance();
		return p2dDao.findAllPatient2Doctors();
	}

}// class
