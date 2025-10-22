package com.vvfirefly.backend.service;

import com.vvfirefly.backend.model.User;
import com.vvfirefly.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository repo;

    public boolean register(User user) {
        if (repo.findByEmail(user.getEmail()).isPresent()) {
            return false; // user already exists
        }
        repo.save(user);
        return true;
    }

    public Optional<User> login(String email, String password) {
        Optional<User> user = repo.findByEmail(email);
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return user;
        }
        return Optional.empty();
    }
}
