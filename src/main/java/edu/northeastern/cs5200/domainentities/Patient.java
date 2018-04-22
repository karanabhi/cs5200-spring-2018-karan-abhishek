/**
 * 
 */
package edu.northeastern.cs5200.domainentities;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

/**
 * @author Abhishek Karan
 *
 */
@Entity
public class Patient {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int _id;
	private String name, dob, gender, email, password;

	@ManyToMany
	@JoinTable(name = "Patient2DOCTOR")
	private List<Doctor> followDoctors = null;

	/**
	 * @return the followDoctors
	 */
	public List<Doctor> getFollowDoctors() {
		return followDoctors;
	}

	/**
	 * @param followDoctors
	 *            the followDoctors to set
	 */
	public void setFollowDoctors(List<Doctor> followDoctors) {
		this.followDoctors = followDoctors;
	}

	/**
	 * @return the email
	 */
	public String getEmail() {
		return email;
	}

	/**
	 * @param email
	 *            the email to set
	 */
	public void setEmail(String email) {
		this.email = email;
	}

	/**
	 * @return the password
	 */
	public String getPassword() {
		return password;
	}

	/**
	 * @param password
	 *            the password to set
	 */
	public void setPassword(String password) {
		this.password = password;
	}

	/**
	 * @return the _id
	 */
	public int get_id() {
		return _id;
	}

	/**
	 * @param _id
	 *            the _id to set
	 */
	public void set_id(int _id) {
		this._id = _id;
	}

	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * @param name
	 *            the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return the dob
	 */
	public String getDob() {
		return dob;
	}

	/**
	 * @param dob
	 *            the dob to set
	 */
	public void setDob(String dob) {
		this.dob = dob;
	}

	/**
	 * @return the gender
	 */
	public String getGender() {
		return gender;
	}

	/**
	 * @param gender
	 *            the gender to set
	 */
	public void setGender(String gender) {
		this.gender = gender;
	}

	public void set(Patient newPatient) {
		this.email = newPatient.email != null ? newPatient.email : this.email;
		this.password = newPatient.password != null ? newPatient.password : this.password;
		this.dob = newPatient.dob != null ? newPatient.dob : this.dob;
		this.gender = newPatient.gender != null ? newPatient.gender : this.gender;
		this.name = newPatient.name != null ? newPatient.name : this.name;
	}

}// class
