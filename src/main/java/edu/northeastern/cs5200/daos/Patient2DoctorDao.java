/**
 * 
 */
package edu.northeastern.cs5200.daos;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import edu.northeastern.cs5200.domainentities.Doctor;
import edu.northeastern.cs5200.domainentities.Patient;
import edu.northeastern.cs5200.domainentities.Patient2Doctor;

/*
 * @author Abhishek Karan
 *
 */
public class Patient2DoctorDao {

	private Connection conn = null;
	private PreparedStatement pstmt = null;
	private int result = 0;
	private ResultSet results = null;
	private static Patient2DoctorDao instance = null;
	private String connString = "jdbc:mysql://cs5200-spring2018-karan.caa00vj8vym7.us-east-1.rds.amazonaws.com/cs5200_spring_2018_healthcare_karan";
	private String uName = "karan";
	private String pass = "yourPa$$word123";

	public static Patient2DoctorDao getInstance() {
		if (instance == null) {
			return new Patient2DoctorDao();
		}
		return instance;
	}

	private Patient2DoctorDao() {
	}

	public int createPatient2Doctor(Patient2Doctor patient2doctor) {
		try {
			Class.forName("com.mysql.jdbc.Driver");
			conn = DriverManager.getConnection(connString, uName, pass);
			String str = "INSERT INTO patient2doctor (patients__id,follow_doctors__id) values(?,?) ";
			pstmt = conn.prepareStatement(str);
			pstmt.setInt(1, patient2doctor.getPatient().get_id());
			pstmt.setInt(2, patient2doctor.getDoctor().get_id());

			result = pstmt.executeUpdate();

		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			try {
				conn.close();
				pstmt.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}

		return result;
	}

	public List<Patient2Doctor> findAllPatient2Doctors() {
		List<Patient2Doctor> lst = new ArrayList<Patient2Doctor>();

		try {
			Class.forName("com.mysql.jdbc.Driver");
			conn = DriverManager.getConnection(connString, uName, pass);
			String str = "SELECT d.*,p._id as pid,p.dob as pdob,p.email as pemail,p.gender as pgender,p.name as pname,p.password as ppassword FROM doctor d, patient2doctor p2d, patient p WHERE p2d.follow_doctors__id=d._id and p2d.patients__id=p._id";
			pstmt = conn.prepareStatement(str);
			results = pstmt.executeQuery();

			while (results.next()) {
				Patient2Doctor p2d = new Patient2Doctor();
				Doctor newDoctor = new Doctor();
				Patient newPatient = new Patient();

				newDoctor.set_id(results.getInt("_id"));
				newDoctor.setAddress(results.getString("address"));
				newDoctor.setEmail(results.getString("email"));
				newDoctor.setGender(results.getString("gender"));
				newDoctor.setName(results.getString("name"));
				newDoctor.setPassword(results.getString("password"));
				newDoctor.setPhone(results.getString("phone"));
				newDoctor.setSpecialization(results.getString("specialization"));

				newPatient.set_id(results.getInt("pid"));
				newPatient.setDob(results.getString("pdob"));
				newPatient.setEmail(results.getString("pemail"));
				newPatient.setGender(results.getString("pgender"));
				newPatient.setName(results.getString("pname"));
				newPatient.setPassword(results.getString("ppassword"));

				p2d.setDoctor(newDoctor);
				p2d.setPatient(newPatient);
				lst.add(p2d);
			}

		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			try {
				conn.close();
				pstmt.close();
				results.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}

		return lst;
	}
}
