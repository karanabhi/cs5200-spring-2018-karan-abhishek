/**
 * 
 */
package edu.northeastern.cs5200.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import edu.northeastern.cs5200.domainentities.Blog;
import edu.northeastern.cs5200.domainentities.Doctor;
import edu.northeastern.cs5200.repository.BlogRepository;
import edu.northeastern.cs5200.repository.DoctorRepository;
import edu.northeastern.cs5200.repository.PatientRepository;

/**
 * @author Abhishek Karan
 *
 */
@RestController
public class BlogController {

	@Autowired
	BlogRepository blogRepository;

	@Autowired
	DoctorRepository doctorRepository;

	@Autowired
	PatientRepository patientRepository;

	@GetMapping("/api/v1/blog")
	public Iterable<Blog> findAllBlogs() {
		return blogRepository.findAll();
	}

	@GetMapping("/api/v1/blog/{blogId}")
	public Blog findBlogById(@PathVariable("blogId") int blogId) {
		return blogRepository.findOne(blogId);
	}

	@PostMapping("/api/v1/blog/doctor/{doctorId}")
	public Blog createBlog(@RequestBody Blog blog, @PathVariable("doctorId") int doctorId) {
		Doctor doctor = doctorRepository.findOne(doctorId);
		blog.setDoctor(doctor);
		return blogRepository.save(blog);
	}

	@PutMapping("/api/v1/blog/{blogId}")
	public Blog updateBlog(@PathVariable("blogId") int id, @RequestBody Blog newblog) {
		Blog blog = blogRepository.findOne(id);
		blog.set(newblog);
		return blogRepository.save(blog);
	}

	@DeleteMapping("/api/v1/blog/{blogId}")
	public void deleteBlog(@PathVariable("blogId") int id) {
		blogRepository.delete(id);
	}

	@GetMapping("/api/v1/blog/doctor/{doctorId}")
	public Iterable<Blog> getBlogByDoctor(@PathVariable("doctorId") int doctorId) {
		return blogRepository.findBlogByDoctorId(doctorId);
	}

	// @PostMapping("/api/v1/blog/{bId}/patient/{pId}")
	// public void followeePatientsToBlogs(@PathVariable("bId") int bId,
	// @PathVariable("pId") int pId) {
	// Patient patient = patientRepository.findOne(pId);
	// Blog blog = blogRepository.findOne(bId);
	// blog.followeePatients(patient);
	// blogRepository.save(blog);
	// }

	@GetMapping("/api/v1/blogCount")
	public long getTotalBlogCount() {
		return blogRepository.count();
	}

	@GetMapping("/api/v1/blogCount/doctor/{doctorId}")
	public long getBlogCountByDoctorId(@PathVariable("doctorId") int doctorId) {
		return blogRepository.findBlogByDoctorId(doctorId).spliterator().getExactSizeIfKnown();
	}

}// class
