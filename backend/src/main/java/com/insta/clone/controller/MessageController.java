package com.insta.clone.controller;

import com.insta.clone.model.Message;
import com.insta.clone.model.User;
import com.insta.clone.service.MessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = "http://localhost:5173")
public class MessageController {
    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping
    public ResponseEntity<Message> sendMessage(@RequestBody MessageRequest request) {
        return ResponseEntity.ok(messageService.sendMessage(request.getReceiverUsername(), request.getContent()));
    }

    @GetMapping("/{username}")
    public ResponseEntity<List<Message>> getChatHistory(@PathVariable String username) {
        return ResponseEntity.ok(messageService.getChatHistory(username));
    }

    @GetMapping("/conversations")
    public ResponseEntity<List<User>> getConversations() {
        return ResponseEntity.ok(messageService.getConversations());
    }

    public static class MessageRequest {
        private String receiverUsername;
        private String content;

        public String getReceiverUsername() { return receiverUsername; }
        public void setReceiverUsername(String receiverUsername) { this.receiverUsername = receiverUsername; }
        public String getContent() { return content; }
        public void setContent(String content) { this.content = content; }
    }
}
