shader_type canvas_item;

uniform vec4 water_color : source_color = vec4(0.2, 0.5, 0.7, 0.8);
uniform vec4 magic_tint : source_color = vec4(0.5, 0.8, 1.0, 0.3);
uniform float wave_speed : hint_range(0.1, 3.0) = 1.0;
uniform float wave_amplitude : hint_range(0.001, 0.05) = 0.02;

void fragment() {
	vec2 uv = UV;
	
	// Ondulations magiques
	uv.x += sin(UV.y * 10.0 + TIME * wave_speed) * wave_amplitude;
	uv.y += cos(UV.x * 10.0 + TIME * wave_speed * 0.7) * wave_amplitude;
	
	vec4 tex_color = texture(TEXTURE, uv);
	vec4 final_color = mix(tex_color, water_color, 0.7);
	
	// Reflet magique en surface
	float shimmer = sin(TIME * 2.0 + UV.x * 20.0) * 0.5 + 0.5;
	final_color.rgb += magic_tint.rgb * shimmer * 0.2;
	
	// Effet de profondeur
	final_color.a = water_color.a;
	
	// Émission légère
	EMISSION = magic_tint.rgb * 0.1 * shimmer;
	
	COLOR = final_color;
}
