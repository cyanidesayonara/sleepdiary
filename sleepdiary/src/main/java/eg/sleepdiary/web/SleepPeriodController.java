package eg.sleepdiary.web;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import eg.sleepdiary.domain.SleepPeriod;
import eg.sleepdiary.domain.SleepPeriodRepository;
import eg.sleepdiary.domain.UserRepository;

/**
 * 
 * @author jaripeks Class that handles incoming HTTP requests
 * @author marhyvar
 */
@Controller
public class SleepPeriodController {

	@Autowired
	private SleepPeriodRepository periodRepo;

	/**
	 * @param model
	 * @return name of the html template that lists all SleepPeriods
	 */
	@GetMapping("/sleepperiods")
	public String getSleepPeriods(Model model) {
		model.addAttribute("sleepPeriods", periodRepo.findAll());
		return "diary";
	}
	
	@GetMapping("/sleepperiodsperday")
	public String findByStartTimeBetween(Model model) {
		model.addAttribute("sleepPeriods", periodRepo.findAllByStartTimeBetween(start, end)
		return "diary";
	}
	
	// Add sleepPeriod
	@GetMapping("/addSP")
	public String addSleepPeriod(Model model) {
		model.addAttribute("sleepPeriod", new SleepPeriod());
		return "addSleepPeriod";
	}
	
	// Save a sleepPeriod
	@PostMapping("/saveSP")
	public String saveSleepPeriod(SleepPeriod sleepPeriod) {
		periodRepo.save(sleepPeriod);
		return "redirect:diary";
	}
	
	// Edit a sleepPeriod
	@GetMapping("/editSP/{id}")
	public String updateSleepPeriod(@PathVariable("id") Long id, Model model) {
		SleepPeriod sleepPeriod = periodRepo.findById(id).get();
		System.out.println("update sleepPeriod " + sleepPeriod.toString());
		model.addAttribute("sleepPeriod", sleepPeriod);
		return "editSleepPeriod";
	}
	
	// Delete a sleepPeriod
	@GetMapping("/deleteSP/{id}")
	public String deleteSleepPeriod(@PathVariable("id") Long id, Model model) {
    	System.out.println("sleepPeriod "  + id);
    	periodRepo.deleteById(id);
    	return "redirect:../diary";
	}
}
