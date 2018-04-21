/**
 * 
 */
package edu.northeastern.cs5200.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import edu.northeastern.cs5200.domainentities.Blog;

/**
 * @author Abhishek Karan
 *
 */
public interface BlogRepository extends CrudRepository<Blog, Integer> {

	@Query("SELECT b FROM Blog b WHERE b.doctor._id=:doctorId")
	Iterable<Blog> findBlogByDoctorId(@Param("doctorId") int doctorId);
}
