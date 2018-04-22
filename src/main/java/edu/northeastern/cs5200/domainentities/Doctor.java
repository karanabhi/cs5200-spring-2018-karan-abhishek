/**
 * 
 */
package edu.northeastern.cs5200.domainentities;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * @author Abhishek Karan
 *
 */
@Entity
public class Doctor {

	private String address, phone, specialization, gender, email, password, name;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int _id;
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "doctor")
	@JsonIgnore
	private List<Blog> blogs;

	@ManyToMany(mappedBy = "followDoctors", cascade = CascadeType.ALL)
	private List<Patient> patients;

	/**
	 * @return the blogs
	 */
	public List<Blog> getBlogs() {
		return blogs;
	}

	/**
	 * @param blogs
	 *            the blogs to set
	 */
	public void setBlogs(List<Blog> blogs) {
		this.blogs = blogs;
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
	 * @return the address
	 */
	public String getAddress() {
		return address;
	}

	/**
	 * @param address
	 *            the address to set
	 */
	public void setAddress(String address) {
		this.address = address;
	}

	/**
	 * @return the phone
	 */
	public String getPhone() {
		return phone;
	}

	/**
	 * @param phone
	 *            the phone to set
	 */
	public void setPhone(String phone) {
		this.phone = phone;
	}

	/**
	 * @return the specialization
	 */
	public String getSpecialization() {
		return specialization;
	}

	/**
	 * @param specialization
	 *            the specialization to set
	 */
	public void setSpecialization(String specialization) {
		this.specialization = specialization;
	}

	public Doctor() {
		super();
	}

	public void set(Doctor newdoctor) {
		this.email = newdoctor.email != null ? newdoctor.email : this.email;
		this.password = newdoctor.password != null ? newdoctor.password : this.password;
		this.address = newdoctor.address != null ? newdoctor.address : this.address;
		this.phone = newdoctor.phone != null ? newdoctor.phone : this.phone;
		this.specialization = newdoctor.specialization != null ? newdoctor.specialization : this.specialization;
		this.gender = newdoctor.gender != null ? newdoctor.gender : this.gender;
		this.name = newdoctor.name != null ? newdoctor.name : this.name;
	}

	public void authoredBlog(Blog blog) {
		this.blogs.add(blog);
		if (blog.getDoctor() != this) {
			blog.setDoctor(this);
		}
	}

}
