/**
 * 
 */
package edu.northeastern.cs5200.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import edu.northeastern.cs5200.domainentities.Doctor;

/**
 * @author Abhishek Karan
 *
 */
public interface DoctorRepository extends CrudRepository<Doctor, Integer> {

	@Query("SELECT d FROM Doctor d WHERE d.email=:email AND d.password=:password")
	Iterable<Doctor> findDoctortByCredentials(@Param("email") String email, @Param("password") String password);
}
