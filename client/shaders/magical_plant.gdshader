shader_type canvas_item;

uniform vec4 base_color : source_color = vec4(0.5, 0.2, 0.8, 1.0);
uniform vec4 glow_color : source_color = vec4(0.7, 0.4, 1.0, 1.0);
uniform float glow_intensity : hint_range(0.0, 3.0) = 1.0;
uniform float pulse_speed : hint_range(0.1, 5.0) = 1.0;

void fragment() {
	vec4 tex_color = texture(TEXTURE, UV);
	vec4 final_color = tex_color * base_color;
	
	// Pulsation magique
	float pulse = sin(TIME * pulse_speed) * 0.5 + 0.5;
	float glow_factor = pulse * glow_intensity;
	
	// Effet de lueur
	final_color.rgb += glow_color.rgb * glow_factor * 0.3;
	final_color.a = tex_color.a;
	
	// Émission pour Lumen (Godot 4)
	EMISSION = glow_color.rgb * glow_factor;
	
	COLOR = final_color;
}
