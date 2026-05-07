shader_type particles;

uniform float sparkle_size : hint_range(0.01, 0.5) = 0.1;
uniform vec4 sparkle_color : source_color = vec4(0.8, 0.9, 1.0, 1.0);
uniform float fade_speed : hint_range(0.1, 5.0) = 1.0;

void vertex() {
	// Taille variable pour effet scintillant
	VERTEX *= sparkle_size + sin(TIME * 10.0 + float(INDEX)) * 0.02;
}

void fragment() {
	// Couleur avec variation temporelle
	vec4 color = sparkle_color;
	color.a *= abs(sin(TIME * fade_speed + float(INDEX) * 0.1));
	
	// Effet de brillance centrale
	float dist = length(UV - vec2(0.5));
	color.a *= 1.0 - smoothstep(0.0, 0.5, dist);
	
	COLOR = color;
	EMISSION = color.rgb * 2.0;
}
