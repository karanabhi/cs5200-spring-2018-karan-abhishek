/**
 * 
 */
package edu.northeastern.cs5200.domainentities;

/**
 * @author Abhishek Karan
 *
 */
public class Patient2Doctor {

	private Patient patient;
	private Doctor doctor;

	/**
	 * @return the patient
	 */
	public Patient getPatient() {
		return patient;
	}

	/**
	 * @param patient
	 *            the patient to set
	 */
	public void setPatient(Patient patient) {
		this.patient = patient;
	}

	/**
	 * @return the doctor
	 */
	public Doctor getDoctor() {
		return doctor;
	}

	/**
	 * @param doctor
	 *            the doctor to set
	 */
	public void setDoctor(Doctor doctor) {
		this.doctor = doctor;
	}

	public Patient2Doctor() {
		// TODO Auto-generated constructor stub
	}

}
