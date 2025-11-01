package com.example.Backend;

import java.text.Normalizer;
import java.util.Random;
import java.util.regex.Pattern;

public class RandomGenerate {
    public static String GenerateId(int number){
        String id = "";
        String setOfCharacters = "qwertyuiopasdfghjklzxcvbnm1234567890@+=";
        Random r = new Random();
        for(int i=0; i<number; i++){
            char key = setOfCharacters.charAt(r.nextInt(setOfCharacters.length()));
            id += key;
        }
        return id;
    }

    public static String removeAccent(String s) {

        String temp = Normalizer.normalize(s, Normalizer.Form.NFD);
        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        return pattern.matcher(temp).replaceAll("");
    }

    public static String generate_slug(String title){
        String slug = title.replace("  ", " ");
        slug = slug.trim();
        slug = removeAccent(slug);
        slug = slug.replace(" ", "-");

        return slug.toLowerCase();
    }
}
