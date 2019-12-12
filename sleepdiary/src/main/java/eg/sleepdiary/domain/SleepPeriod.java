package eg.sleepdiary.domain;

import java.time.LocalDateTime;
import java.time.Duration;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * 
 * @author jaripeks A class that represents the SleepPeriod table in the database
 *
 */
@Entity
public class SleepPeriod {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	private LocalDateTime startTime;
	private LocalDateTime endTime;
	@ManyToOne
	@JsonIgnore
	@JoinColumn(name="users_id")
	private User user;

	public SleepPeriod() {
		super();
	}

	public SleepPeriod(LocalDateTime start, LocalDateTime end, User user) {
		super();
		this.startTime = start;
		this.endTime = end;
		this.user = user;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public LocalDateTime getStartTime() {
		return startTime;
	}

	public void setStartTime(LocalDateTime start) {
		this.startTime = start;
	}

	public LocalDateTime getEndTime() {
		return endTime;
	}

	public void setEndTime(LocalDateTime end) {
		this.endTime = end;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	/**
	 * 
	 * @return the number of hours between the endtime and the starttime of the SleepPeriod
	 * 
	 */
	public long getDuration() {
		return Duration.between(startTime, endTime).toHours();
	}

	@Override
	public String toString() {
		return "SleepPeriod [id=" + id + ", startTime=" + startTime + ", endTime=" + endTime + ", user=" + user + "]";
	}

}
