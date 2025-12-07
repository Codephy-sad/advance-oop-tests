package com.store.inventory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/gadgets")
@CrossOrigin(origins = "*") 
public class GadgetController {

    @Autowired
    private GadgetRepository repo;

    @GetMapping
    public List<Gadget> getAll() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Gadget> getById(@PathVariable Long id) {
        return repo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Gadget create(@RequestBody Gadget gadget) {
        return repo.save(gadget);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Gadget> update(@PathVariable Long id, @RequestBody Gadget details) {
        return repo.findById(id).map(gadget -> {
            gadget.setName(details.getName());
            gadget.setBrand(details.getBrand());
            gadget.setPrice(details.getPrice());
            return ResponseEntity.ok(repo.save(gadget));
        }).orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Gadget> patch(@PathVariable Long id, @RequestBody Gadget details) {
        return repo.findById(id).map(gadget -> {
            if(details.getName() != null) gadget.setName(details.getName());
            if(details.getBrand() != null) gadget.setBrand(details.getBrand());
            if(details.getPrice() != null) gadget.setPrice(details.getPrice());
            return ResponseEntity.ok(repo.save(gadget));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}