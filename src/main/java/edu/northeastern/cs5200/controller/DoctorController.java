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
import edu.northeastern.cs5200.domainentities.Patient2Doctor;
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

	@GetMapping("/api/v1/doctor/patient/{patientId}")
	public List<Doctor> findAllDoctorsNotFollowingPatientId(@PathVariable("patientId") int pid) {

		List<Doctor> doctorLst = (List<Doctor>) doctorRepository.findAll();
		List<Doctor> doctorLst1 = (List<Doctor>) doctorRepository.findAll();

		Patient2DoctorDao p2dDao = Patient2DoctorDao.getInstance();
		List<Patient2Doctor> p2d = p2dDao.findAllPatient2Doctors();

		if (doctorLst.size() <= 0) {
			return null;
		} else if (p2d.size() <= 0) {
			return doctorLst;
		}
		for (Patient2Doctor p : p2d) {
			for (Doctor d : doctorLst) {
				// System.out.println(doctorLst1.contains(d));
				if (p.getDoctor().get_id() == d.get_id() && p.getPatient().get_id() == pid) {
					doctorLst1.remove(d);
					// System.out.println("Inside If: " + doctorLst.contains(d));
				}
			}
		}
		return doctorLst1;
	}
}// class
