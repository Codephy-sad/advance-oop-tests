package com.assignment.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*") 
public class ProductController {

    @Autowired
    private ProductRepository repo;

    @GetMapping
    public List<Product> getAll() { return repo.findAll(); }

    @GetMapping("/{id}")
    public Product getOne(@PathVariable Long id) { return repo.findById(id).orElse(null); }

    @PostMapping
    public Product create(@RequestBody Product product) { return repo.save(product); }

    @PutMapping("/{id}")
    public Product update(@PathVariable Long id, @RequestBody Product product) {
        product.setId(id);
        return repo.save(product);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { repo.deleteById(id); }
}