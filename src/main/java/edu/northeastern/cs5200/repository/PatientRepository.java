/**
 * 
 */
package edu.northeastern.cs5200.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import edu.northeastern.cs5200.domainentities.Patient;

/**
 * @author Abhishek Karan
 *
 */
public interface PatientRepository extends CrudRepository<Patient, Integer> {

	@Query("SELECT p FROM Patient p WHERE p.email=:email AND p.password=:password")
	Iterable<Patient> findPatientByCredentials(@Param("email") String email, @Param("password") String password);
}
