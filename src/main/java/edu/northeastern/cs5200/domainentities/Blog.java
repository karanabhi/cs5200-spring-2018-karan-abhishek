/**
 * 
 */
package edu.northeastern.cs5200.domainentities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

/**
 * @author Abhishek Karan
 *
 */
@Entity
public class Blog {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int _id;
	@ManyToOne
	private Doctor doctor;
	private String body, timestamp, title;
	// @ManyToMany
	// @JoinTable(name = "BLOG_PATIENT", joinColumns = @JoinColumn(name = "BLOG_ID",
	// referencedColumnName = "_ID"), inverseJoinColumns = @JoinColumn(name =
	// "PATIENT_ID", referencedColumnName = "_ID"))
	// @JsonIgnore
	// private List<Patient> followedPatients;

	// public void followeePatients(Patient patient) {
	// this.followedPatients.add(patient);
	// if (!patient.getFollowedBlogs().contains(this)) {
	// patient.getFollowedBlogs().add(this);
	// }
	// }

	/**
	 * @return the followedPatients
	 */
	// public List<Patient> getFollowedPatients() {
	// return followedPatients;
	// }

	/**
	 * @param followedPatients
	 *            the followedPatients to set
	 */
	// public void setFollowedPatients(List<Patient> followedPatients) {
	// this.followedPatients = followedPatients;
	// }
	//
	public Blog() {
		super();
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
		if (!doctor.getBlogs().contains(this)) {
			doctor.getBlogs().add(this);
		}
	}

	/**
	 * @return the body
	 */
	public String getBody() {
		return body;
	}

	/**
	 * @param body
	 *            the body to set
	 */
	public void setBody(String body) {
		this.body = body;
	}

	/**
	 * @return the timestamp
	 */
	public String getTimestamp() {
		return timestamp;
	}

	/**
	 * @param timestamp
	 *            the timestamp to set
	 */
	public void setTimestamp(String timestamp) {
		this.timestamp = timestamp;
	}

	/**
	 * @return the title
	 */
	public String getTitle() {
		return title;
	}

	/**
	 * @param title
	 *            the title to set
	 */
	public void setTitle(String title) {
		this.title = title;
	}

	public void set(Blog newblog) {
		this.body = newblog.body != null ? newblog.body : this.body;
		this.timestamp = newblog.timestamp != null ? newblog.timestamp : this.timestamp;
		this.title = newblog.title != null ? newblog.title : this.title;
		this.doctor = newblog.doctor != null ? newblog.doctor : this.doctor;
		// this.followedPatients = newblog.followedPatients != null ?
		// newblog.followedPatients : this.followedPatients;
	}
}// class
