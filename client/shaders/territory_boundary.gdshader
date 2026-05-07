shader_type canvas_item;

uniform vec4 border_color : source_color = vec4(0.0, 1.0, 0.5, 0.3);
uniform float border_width : hint_range(0.01, 0.2) = 0.05;
uniform float pulse_speed : hint_range(0.1, 5.0) = 1.5;

void fragment() {
	vec2 center = vec2(0.5, 0.5);
	float dist = length(UV - center);
	float edge = 0.5 - border_width;
	
	vec4 color = vec4(0.0);
	
	// Bordure du territoire
	if (dist > edge && dist <= 0.5) {
		float pulse = sin(TIME * pulse_speed) * 0.3 + 0.7;
		color = border_color;
		color.a *= pulse;
	}
	
	// Intérieur semi-transparent
	if (dist <= edge) {
		color = vec4(0.0, 1.0, 0.5, 0.05);
	}
	
	// Effet de lueur à la bordure
	if (abs(dist - edge) < 0.02) {
		color.rgb *= 2.0;
		EMISSION = color.rgb;
	}
	
	COLOR = color;
}
